import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon/icon';

export default class ContentMetaPreviewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { imageUri: '', translations: [] };

        this.toggleBookmark = this.toggleBookmark.bind(this);
    }

    /**
     * Renders an icon related to a content type
     *
     * @method renderIcon
     * @returns {JSX.Element|null}
     * @memberof ContentMetaPreviewComponent
     */
    renderIcon() {
        const contentTypeInfo = this.props.data.ContentInfo.Content.ContentTypeInfo;

        if (!contentTypeInfo) {
            return null;
        }

        const contentTypeIdentifier = contentTypeInfo.identifier;
        const contentTypeIconUrl = eZ.helpers.contentType.getContentTypeIconUrl(contentTypeIdentifier);

        return <Icon customPath={contentTypeIconUrl} extraClasses="c-meta-preview__icon ez-icon--small" />;
    }

    /**
     * Gets image URI to image preview from content meta
     *
     * @method getImageUri
     * @returns {String}
     * @memberof ContentMetaPreviewComponent
     */
    getImageUri(data) {
        if (!data || !data.CurrentVersion) {
            return '';
        }

        const version = data.CurrentVersion.Version;
        const imageField = version.Fields.field.find((field) => field.fieldTypeIdentifier === 'ezimage');

        return imageField && imageField.fieldValue ? imageField.fieldValue.uri : '';
    }

    /**
     * Gets list of translations from content meta
     *
     * @method getTranslations
     * @returns {Array}
     * @memberof ContentMetaPreviewComponent
     */
    getTranslations(data) {
        if (!data || !data.CurrentVersion) {
            return [];
        }

        const version = data.CurrentVersion.Version;
        const versionLanguages = version.VersionInfo.VersionTranslationInfo.Language;

        return versionLanguages.map((language) => this.props.languages.mappings[language.languageCode].name);
    }

    /**
     * Renders a translation item
     *
     * @method renderTranslation
     * @returns {Element}
     * @memberof ContentMetaPreviewComponent
     */
    renderTranslation(translation, index) {
        return (
            <span key={index} className="c-meta-preview__translation">
                {translation}
            </span>
        );
    }

    /**
     * Renders image preview
     *
     * @method renderImagePreview
     * @returns {Element}
     * @memberof ContentMetaPreviewComponent
     */
    renderImagePreview() {
        const { data } = this.props;

        if (!data.CurrentVersion) {
            return <Icon name="spinner" extraClasses="c-meta-preview__loading-spinner ez-spin ez-icon-x2 ez-icon-spinner" />;
        }

        const imageUri = this.getImageUri(data);
        const imagePreviewNotAvailableLabel = Translator.trans(
            /*@Desc("Content preview is not available")*/ 'content_meta_preview.image_preview_not_available.info',
            {},
            'universal_discovery_widget'
        );

        if (!imageUri.length) {
            return <Fragment>{imagePreviewNotAvailableLabel}</Fragment>;
        }

        return <img className="c-meta-preview__image" src={imageUri} alt="" />;
    }

    /**
     * Toggles bookmark
     *
     * @method toggleBookmark
     * @memberof ContentMetaPreviewComponent
     */
    toggleBookmark() {
        const { toggleBookmark, data } = this.props;

        toggleBookmark(data);
    }

    /**
     * Renders bookmark icon
     *
     * @method renderBookmarkIcon
     * @memberof ContentMetaPreviewComponent
     */
    renderBookmarkIcon() {
        const { isBookmarked } = this.props;

        const bookmarkIconId = isBookmarked ? 'bookmark-active' : 'bookmark';
        const action = isBookmarked ? 'remove' : 'add';
        const wrapperClassName = `c-meta-preview__content-bookmark c-meta-preview__content-bookmark--${action}`;

        return (
            <div className={wrapperClassName} onClick={this.toggleBookmark} tabIndex="-1">
                <Icon name={bookmarkIconId} extraClasses="ez-icon--medium ez-icon--secondary" />
            </div>
        );
    }

    render() {
        const { data, maxHeight } = this.props;
        const content = data.ContentInfo.Content;
        const contentTypeIdentifier = content.ContentTypeInfo.identifier;
        const contentTypeName = window.eZ.helpers.contentType.getContentTypeName(contentTypeIdentifier);
        const { formatShortDateTime } = window.eZ.helpers.timezone;
        const translations = this.getTranslations(data);
        const title = Translator.trans(/*@Desc("Content Meta Preview")*/ 'content_meta_preview.title', {}, 'universal_discovery_widget');
        const lastModifiedLabel = Translator.trans(
            /*@Desc("Last modified")*/ 'content_meta_preview.last_modified.label',
            {},
            'universal_discovery_widget'
        );
        const creationDateLabel = Translator.trans(
            /*@Desc("Creation date")*/ 'content_meta_preview.creation_date.label',
            {},
            'universal_discovery_widget'
        );
        const translationsLabel = Translator.trans(
            /*@Desc("Translations")*/ 'content_meta_preview.translations.label',
            {},
            'universal_discovery_widget'
        );

        return (
            <div className="c-meta-preview__wrapper" style={{ maxHeight: `${maxHeight}px` }}>
                <h1 className="c-meta-preview__title">{title}</h1>
                <div className="c-meta-preview">
                    <div className="c-meta-preview__top-wrapper">
                        <div className="c-meta-preview__content-type">
                            {this.renderIcon()} {contentTypeName}
                        </div>
                        {this.renderBookmarkIcon()}
                    </div>
                    <div className="c-meta-preview__meta-wrapper">
                        <div className="c-meta-preview__image-wrapper">{this.renderImagePreview()}</div>
                        <div className="c-meta-preview__name">{content.Name}</div>
                        <div className="c-meta-preview__content-info">
                            <h3 className="c-meta-preview__subtitle">{lastModifiedLabel}:</h3>
                            {formatShortDateTime(new Date(content.lastModificationDate))}
                        </div>
                        <div className="c-meta-preview__content-info">
                            <h3 className="c-meta-preview__subtitle">{creationDateLabel}:</h3>
                            {formatShortDateTime(new Date(content.publishedDate))}
                        </div>
                        <div className="c-meta-preview__content-info">
                            <h3 className="c-meta-preview__subtitle">{translationsLabel}:</h3>
                            {translations.map(this.renderTranslation)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ContentMetaPreviewComponent.propTypes = {
    data: PropTypes.object.isRequired,
    isBookmarked: PropTypes.bool,
    toggleBookmark: PropTypes.func.isRequired,
    contentTypesMap: PropTypes.object.isRequired,
    restInfo: PropTypes.shape({
        token: PropTypes.string.isRequired,
        siteaccess: PropTypes.string.isRequired,
    }).isRequired,
    maxHeight: PropTypes.number.isRequired,
    activeTab: PropTypes.string.isRequired,
    languages: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
};

ContentMetaPreviewComponent.defaultProps = {
    isBookmarked: null,
};
